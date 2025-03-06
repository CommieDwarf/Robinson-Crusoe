export interface IAlertService {
	alert: string;
	setAlert: (message: string) => void;
	clearAlert: () => void;
	renderData: IAlertServiceRenderData;
}

export interface IAlertServiceRenderData {
	alert: string;
}
