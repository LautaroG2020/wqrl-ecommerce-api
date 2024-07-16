export default class QueryResult {
    data: any = null;
    errors: string[] = [];

    constructor(data: any = null, error: string | null = null) {
        this.data = data;
        if (error != null) this.errors.push(error);
    }

    AddViolationOfPKError() {
        this.errors.push(TypeOfErrors.ViolationOfPK);
    }

    AddError(stringError: string) {
        this.errors.push(stringError);
    }

    HasErrors(): boolean {
        return this.errors.length > 0;
    }

    GetStringErrors(): string {
        return this.errors.join("\n");
    }

    static Create(data: any = null, error: string | null = null): QueryResult {
        return new QueryResult(data, error);
    }

    static CreateError(error: string): QueryResult {
        return new QueryResult(null, error);
    }

    static CreateOk(data: any): QueryResult {
        return new QueryResult(data, null);
    }
}

const TypeOfErrors = {
    ViolationOfPK: "Violation of PRIMARY KEY",
    Others: "Others",
};