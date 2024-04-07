import * as uri from "@/common/uri";

type UIComponentCommon = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Board = {
  type: "Board";
  rightControlBox?: boolean;
  leftControlBox?: boolean;
};

type Record = {
  type: "Record";
  showCommentColumn?: boolean;
  showElapsedTimeColumn?: boolean;
  topControlBox?: boolean;
  branches?: boolean;
};

export enum EvaluationChartType {
  RAW = "raw",
  WIN_RATE = "winRate",
}

type Chart = {
  type: "Chart";
  chartType: EvaluationChartType;
  showLegend?: boolean;
};

type Analytics = {
  type: "Analytics";
  historyMode?: boolean;
  showHeader?: boolean;
  showTimeColumn?: boolean;
  showMultiPvColumn?: boolean;
  showDepthColumn?: boolean;
  showNodesColumn?: boolean;
  showScoreColumn?: boolean;
  showPlayButton?: boolean;
};

export type UIComponent = UIComponentCommon & (Board | Record | Chart | Analytics);

export type LayoutProfile = {
  uri: string;
  name: string;
  components: UIComponent[];
};

export type LayoutProfileConfig = {
  profiles: LayoutProfile[];
};

export function emptyLayoutProfileConfig(): LayoutProfileConfig {
  return { profiles: [] };
}

export function appendNewCustomLayoutProfile(config: LayoutProfileConfig): string {
  const profile: LayoutProfile = {
    uri: uri.issueCustomLayoutProfileURI(),
    name: "New Profile",
    components: [
      {
        type: "Board",
        left: 10,
        top: 10,
        width: 800,
        height: 500,
      },
      {
        type: "Record",
        left: 10,
        top: 298,
        width: 150,
        height: 211,
      },
      {
        type: "Analytics",
        left: 628,
        top: 10,
        width: 400,
        height: 64,
      },
      {
        type: "Chart",
        left: 628,
        top: 83,
        width: 400,
        height: 160,
        chartType: EvaluationChartType.WIN_RATE,
      },
    ],
  };
  config.profiles.push(profile);
  return profile.uri;
}

export function appendCopiedCustomLayoutProfile(
  config: LayoutProfileConfig,
  profileURI: string,
): string | null {
  const profile = config.profiles.find((profile) => profile.uri === profileURI);
  if (!profile) {
    return null;
  }
  const newProfileURI = uri.issueCustomLayoutProfileURI();
  config.profiles.push({
    ...JSON.parse(JSON.stringify(profile)),
    uri: newProfileURI,
    name: `${profile.name} (Copy)`,
  });
  return newProfileURI;
}

export function removeCustomLayoutProfile(config: LayoutProfileConfig, uri: string) {
  config.profiles = config.profiles.filter((profile) => profile.uri !== uri);
}
