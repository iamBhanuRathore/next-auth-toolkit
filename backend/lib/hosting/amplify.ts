import { Construct } from "constructs";
import { SecretValue } from "aws-cdk-lib";
import * as amplify from "@aws-cdk/aws-amplify-alpha";
import { BuildSpec } from "aws-cdk-lib/aws-codebuild";
type Props = {
  appName: string;
  branch: string;
  ghOwner: string;
  repo: string;
  ghTokenName: string;
};

export function createAmplifyHosting(
  scope: Construct,
  { appName, branch, ghOwner, repo, ghTokenName }: Props
) {
  const amplifyApp = new amplify.App(scope, `${appName}-hosting`, {
    appName,
    sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
      owner: ghOwner,
      repository: repo,
      oauthToken: SecretValue.secretsManager(ghTokenName),
    }),
    platform: amplify.Platform.WEB_COMPUTE,
    autoBranchDeletion: true,
    customRules: [
      {
        source: "/<*>",
        target: "/index.html",
        status: amplify.RedirectStatus.NOT_FOUND_REWRITE,
      },
    ],
    environmentVariables: {
      myAmplifyEnv: "fontend", //process.env.myAmplifyEnv
    },
    buildSpec: BuildSpec.fromObjectToYaml({
      version: 1,
      frontend: {
        phases: {
          prebuild: {
            commands: ["npm i"],
          },
          build: {
            commands: ["npm run build"],
          },
        },
        artifacts: {
          baseDirectory: ".next",
          files: ["**/*"],
        },
        cache: {
          paths: ["node_modules/**/*"],
        },
      },
    }),
  });
  amplifyApp.addBranch(branch, {
    stage: branch === "main" ? "PRODUCTION" : "DEVELOPMENT",
    branchName: branch,
  });
  return amplifyApp;
}
