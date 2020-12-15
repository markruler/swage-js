class SwaggerJSON {
  constructor() {}
  toString() {
    return JSON.stringify(this);
  }
}

class SwaggerAPI extends SwaggerJSON {
  constructor(build) {
    super();
    this.tag = build.tag || '';
    this.method = build.method || '';
    this.path = build.path || '';
    this.summary = build.summary || '';
    this.description = build.description || '';
    this.request = build.request || [];
    this.response = build.response || [];
  }
}

export class SwaggerAPIBuilder {
  constructor() {
    this.tag = '';
    this.method = '';
    this.path = '';
    this.summary = '';
    this.description = '';
    this.request = [];
    this.response = [];
  }
  withTag(tag) {
    this.tag = tag;
    return this;
  }
  withMethod(method) {
    this.method = method;
    return this;
  }
  withPath(path) {
    this.path = path;
    return this;
  }
  withSummary(summary) {
    this.summary = summary;
    return this;
  }
  withDescription(description) {
    this.description = description;
    return this;
  }
  withRequest(request) {
    this.request = request;
    return this;
  }
  withResponse(response) {
    this.response = response;
    return this;
  }
  build() {
    return new SwaggerAPI(this);
  }
}

class SwaggerProperty extends SwaggerJSON {
  constructor(build) {
    super();
    this.name = build.name || '';
    this.paramType = build.paramType || '';
    this.dataType = build.dataType || '';
    this.level = build.level || 1;
    this.description = build.description || '';
    this.required = build.required || false;
    this.simpleValue = build.simpleValue || '';
    this.posibleValue = build.posibleValue || '';
  }
}
export class SwaggerPropertyBuilder {
  constructor() {
    this.name = '';
    this.paramType = '';
    this.dataType = '';
    this.level = 1;
    this.description = '';
    this.required = false;
    this.simpleValue = '';
    this.posibleValue = '';
  }
  withName(name) {
    this.name = name;
    return this;
  }
  withParamType(paramType) {
    this.paramType = paramType;
    return this;
  }
  withDataType(dataType) {
    this.dataType = dataType;
    return this;
  }
  withLevel(level) {
    this.level = level;
    return this;
  }
  withDescription(description) {
    this.description = description;
    return this;
  }
  withRequired(required) {
    this.required = required;
    return this;
  }
  withSimpleValue(simpleValue) {
    this.simpleValue = simpleValue;
    return this;
  }
  withPosibleValue(posibleValue) {
    this.posibleValue = posibleValue;
    return this;
  }
  build() {
    return new SwaggerProperty(this);
  }
}
