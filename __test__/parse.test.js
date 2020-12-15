import { SwaggerAPIBuilder, SwaggerPropertyBuilder } from '../src/model.js';
import { parse } from '../src/parser.js';
const swaggerJSON = require('../example/short.json');

describe('swage parser', () => {
  it('should handle null', () => {
    expect(parse({})).toBeUndefined();
    expect(parse(null)).toBeUndefined();
    expect(parse(undefined)).toBeUndefined();
  });

  it('should parse a swagger JSON', () => {
    const world = new SwaggerAPIBuilder()
      .withTag('world')
      .withMethod('get')
      .withPath('/_hello/_world')
      .withSummary('world summary!')
      .withDescription('world description!')
      .withResponse([
        new SwaggerPropertyBuilder()
          .withDataType('integer')
          .withLevel(1)
          .withName('code')
          .withParamType('body')
          .withRequired(false)
          .withPosibleValue('00, 11, 22')
          .build(),
        new SwaggerPropertyBuilder()
          .withDataType('string')
          .withLevel(1)
          .withName('type')
          .withParamType('body')
          .withRequired(false)
          .withSimpleValue('test type')
          .build(),
        new SwaggerPropertyBuilder()
          .withDataType('string')
          .withLevel(1)
          .withName('message')
          .withParamType('body')
          .withRequired(false)
          .withSimpleValue('test-msg')
          .build(),
      ])
      .build();
    const swage = new SwaggerAPIBuilder()
      .withTag('swage')
      .withMethod('get')
      .withPath('/hello/swage')
      .withSummary('swage summary!')
      .withDescription('swage description!')
      .withResponse([
        new SwaggerPropertyBuilder()
          .withDataType('integer')
          .withLevel(1)
          .withName('code')
          .withParamType('body')
          .withRequired(false)
          .withPosibleValue('00, 11, 22')
          .build(),
        new SwaggerPropertyBuilder()
          .withDataType('string')
          .withLevel(1)
          .withName('type')
          .withParamType('body')
          .withRequired(false)
          .withSimpleValue('test type')
          .build(),
        new SwaggerPropertyBuilder()
          .withDataType('string')
          .withLevel(1)
          .withName('message')
          .withParamType('body')
          .withRequired(false)
          .withSimpleValue('test-msg')
          .build(),
      ])
      .build();
    expect(parse(swaggerJSON)).toEqual([world, swage]);
  });
});
