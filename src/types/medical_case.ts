export interface MedicalCase {
    caseId?: string;
    title?: string;
    status: string;
    feedback?: string;
    questionnaire?: string;
    classification?: string;
    editor?: string;
}

export interface UpdateMedicalCase {
    caseId?: string;
    title?: string;
    status?: string;
    feedback?: string;
    questionnaire?: string;
    classification?: string;
    editor?: string;
}
