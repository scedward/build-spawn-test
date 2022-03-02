import { Construct } from 'constructs';
import { aws_codebuild, Stack, StackProps } from 'aws-cdk-lib';

export class BuildSpawnTest extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new aws_codebuild.Project(this, 'BuildSpawnTest', {
      source: aws_codebuild.Source.gitHub({
        owner: 'scedward',
        repo: 'build-spawn-test'
      }),
      buildSpec: aws_codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: [
              'node build-args-shell-test.js'
            ]
          }
        }
      }),
      environment: {
        buildImage: aws_codebuild.LinuxBuildImage.STANDARD_5_0,
        privileged: true,
        environmentVariables: {
          FOO: {
            value: 'bar'
          }
        }
      }
    })
  }
}
