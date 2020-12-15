import { SwaggerAPIBuilder, SwaggerPropertyBuilder } from './model';

/**
 * @param {object} swaggerJSON Swagger JSON
 * @return {Array.<SwaggerAPI>} API List
 */
export function parse(swaggerJSON) {
  let apis = [];
  if (!swaggerJSON) return;
  if (typeof swaggerJSON !== 'object') return;
  if (Object.keys(swaggerJSON).length === 0) return;
  for (const [path, methods] of Object.entries(swaggerJSON.paths)) {
    if (!methods) continue;
    for (const [method, apiByMethod] of Object.entries(methods)) {
      if (!apiByMethod) continue;
      let swaggerAPI = new SwaggerAPIBuilder()
        .withTag(apiByMethod.tags[0])
        .withMethod(method)
        .withPath(path)
        .withSummary(apiByMethod.summary)
        .withDescription(apiByMethod.description)
        .build();
      parseAPIRequest(swaggerJSON, swaggerAPI, apiByMethod);
      parseAPIResponse(swaggerJSON, swaggerAPI, apiByMethod);
      apis.push(swaggerAPI);
    }
  }
  return apis;
}

/**
 * @param {object} swaggerJSON Swagger JSON
 * @param {SwaggerAPI} swaggerAPI Swagger API class
 * @param {object} apiByMethod API by method
 */
const parseAPIRequest = (swaggerJSON, swaggerAPI, apiByMethod) => {
  let arrayParamters = [];
  for (let index in apiByMethod.parameters) {
    const parameter = apiByMethod.parameters[index];
    if (parameter.schema) {
      getDefinition('request', swaggerJSON, swaggerAPI, parameter, arrayParamters);
      continue;
    }
    swaggerAPI.request.push(
      new SwaggerPropertyBuilder()
        .withName(parameter.name)
        .withParamType(parameter.in)
        .withDataType(parameter.type)
        .withLevel(1)
        .withRequired(parameter.required ? true : false)
        .withDescription(parameter.description)
        .withSimpleValue('') // example
        .withPosibleValue('') // enum
        .build(),
    );
  }
};

/**
 * @param {object} swaggerJSON Swagger JSON
 * @param {SwaggerAPI} swaggerAPI Swagger API class
 * @param {object} apiByMethod API by method
 */
const parseAPIResponse = (swaggerJSON, swaggerAPI, apiByMethod) => {
  const response = apiByMethod.responses['200'];
  if (response && response.schema) {
    let arrayResponses = [];
    getDefinition('response', swaggerJSON, swaggerAPI, response, arrayResponses);
  }
};

const getDefinition = (type, swaggerJSON, swaggerAPI, prop, arr) => {
  let definitionName = '';
  if (!prop.schema) return;
  if (prop.schema.$ref) {
    definitionName = getDefinitionName(prop.schema.$ref);
  } else if (prop.schema.items && prop.schema.items.$ref) {
    definitionName = getDefinitionName(prop.schema.items.$ref);
  } else {
    definitionName = prop.schema.type;
  }
  arr = listParameterFromDefinition(swaggerJSON, 1, definitionName, 'body', arr);
  if (arr) swaggerAPI[type] = [...swaggerAPI[type], ...arr];
};

/**
 *
 * @param {object} swaggerJSON
 * @param {number} level
 * @param {string} definitionName
 * @param {string} paramType
 * @param {Array.<SwaggerProperty>} arrayProperties
 * @returns {Array.<SwaggerProperty>} Array of API Parameters
 */
const listParameterFromDefinition = (swaggerJSON, level, definitionName, paramType, arrayProperties) => {
  if (!swaggerJSON) return;
  if (!swaggerJSON.definitions) return;
  const definition = swaggerJSON.definitions[definitionName];
  if (!definition) return;
  for (const [defKey, defValue] of Object.entries(definition.properties)) {
    let prop = new SwaggerPropertyBuilder()
      .withParamType(paramType)
      .withLevel(level)
      .withRequired(defValue.required || getRequiredFromDefinition(definition, defKey))
      .withDescription(defValue.description || '')
      .withSimpleValue(defValue.example || '')
      .withPosibleValue(defValue.enum ? defValue.enum.join(', ') : '');
    // Get all child definitions recursively
    if (defValue.$ref) {
      definitionName = getDefinitionName(defValue.$ref);
      arrayProperties.push(
        prop
          .withName(level > 1 ? `${definitionName}_${defKey}` : defKey)
          .withDataType('object')
          .build(),
      );
      listParameterFromDefinition(swaggerJSON, level + 1, definitionName, paramType, arrayProperties);
      continue;
    }
    arrayProperties.push(
      prop
        .withName(level > 1 ? `${definitionName}_${defKey}` : defKey)
        .withDataType(defValue.type)
        .build(),
    );
  }
  return arrayProperties;
};

/**
 * @param {string} ref
 */
const getDefinitionName = ref => ref.split('/').pop();

/**
 * @param {object} definition
 * @param {string} propName
 */
function getRequiredFromDefinition(definition, propName) {
  if (!definition.required) return false;
  return definition.required.includes(propName);
}
