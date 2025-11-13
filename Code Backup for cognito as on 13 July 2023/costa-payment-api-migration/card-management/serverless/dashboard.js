/* eslint no-template-curly-in-string: 0 */

/**
 * Temporary solution for Cloudwatch Dashboard deployment. Will be replaced by
 * Terraform some time later.
 *
 * The commented out line is just as a placeholder/note/documentation/howto
 * because there are none available on the internet.
 * await resolveConfigurationProperty([path, to, configuration, property]);
 */

async function dashboardBody({ resolveVariable, resolveConfigurationProperty }) {
  const resolveProperty = async (prop, schemaCallback) => (
    resolveConfigurationProperty(schemaCallback(prop))
  );

  const resolveFunctionsToSources = async (propertyCollectionVariable) => {
    const lambdaProperties = await resolveVariable(propertyCollectionVariable);
    const lambdaNames = await Promise.all(lambdaProperties.map(async (name) => {
      const functionName = await resolveProperty(name, (x) => (['functions', x, 'name']));
      return `/aws/lambda/${functionName}`;
    }));
    return lambdaNames.join('\' | SOURCE \'');
  };

  const createArns = async (service, resource, names, useRegion = true) => {
    const regionString = useRegion ? '${AWS::Region}' : '';
    return Promise.all(names.map(async (name) => (
      `arn:aws:${service}:${regionString}:\${AWS::AccountId}:${resource}:${name}`
    )));
  };

  const apiId = await resolveConfigurationProperty(['custom', 'dashboard', 'apiId']);
  const alarmProps = await resolveConfigurationProperty(['custom', 'dashboard', 'alarms']);
  const alarmNames = await Promise.all(alarmProps.map(async (prop) => (
    resolveProperty(
      prop,
      (x) => (['resources', 'Resources', x, 'Properties', 'AlarmName']),
    )
  )));
  const alarmArns = await createArns('cloudwatch', 'alarm', alarmNames);
  const handlerSources = await resolveFunctionsToSources('self:custom.dashboard.handlerLambdas');
  const body = {
    start: '-PT9H',
    periodOverride: 'inherit',
    widgets: [
      {
        type: 'log',
        x: 0,
        y: 0,
        width: 24,
        height: 6,
        properties: {
          query: `SOURCE '${handlerSources}'
            | fields @timestamp, @message, @logStream, @log
            | parse @message '*:*' as messageType, messageContent
            | filter messageType = 'error'
            | sort @timestamp desc
            | limit 20
            | display @timestamp, @message, @logStream, @log`,
          region: await resolveVariable('self:provider.region'),
          stacked: false,
          view: 'table',
          title: 'Handler functions error logs',
        },
      },
      {
        height: 6,
        width: 6,
        y: 6,
        x: 0,
        type: 'metric',
        properties: {
          view: 'timeSeries',
          stacked: false,
          metrics: [
            ['AWS/ApiGateway', '4xx', 'Stage', '$default', 'ApiId', '${apiId}'],
            ['.', '5xx', '.', '.', '.', '.'],
          ],
          region: await resolveVariable('self:provider.region'),
          title: 'API codes 4xx, 5xx',
        },
      },
      {
        height: 6,
        width: 6,
        y: 6,
        x: 6,
        type: 'metric',
        properties: {
          view: 'timeSeries',
          stacked: false,
          metrics: [
            ['AWS/ApiGateway', 'Latency', 'Stage', '$default', 'ApiId', '${apiId}'],
            ['.', 'IntegrationLatency', '.', '.', '.', '.'],
          ],
          region: await resolveVariable('self:provider.region'),
          title: 'API latency',
        },
      },
      {
        height: 6,
        width: 12,
        y: 6,
        x: 12,
        type: 'alarm',
        properties: {
          title: 'Alarms status',
          alarms: alarmArns,
        },
      },
    ],
  };
  const strBody = JSON.stringify(body);
  return {
    'Fn::Sub': [
      strBody,
      {
        apiId,
      },
    ],
  };
}

module.exports = { dashboardBody };
