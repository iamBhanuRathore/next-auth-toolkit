import * as amplify from "@aws-cdk/aws-amplify-alpha";
import { SecretValue } from "aws-cdk-lib";
import { Construct } from "constructs";
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
  });
  amplifyApp.addBranch(branch, {
    stage: branch === "main" ? "PRODUCTION" : "DEVELOPMENT",
    branchName: branch,
  });
  return amplifyApp;
}
