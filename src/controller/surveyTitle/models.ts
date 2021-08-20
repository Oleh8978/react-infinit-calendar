export interface ISurveyTitle {
  title: string;
}

export interface ISurveyTitleState {
  surveyInfo: ISurveyTitle;
  loader: ISetLoadingAction;
}

export interface ISetLoadingAction {
  status: boolean;
}
