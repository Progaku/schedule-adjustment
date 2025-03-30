import * as __typia_transform__isFormatDate from "typia/lib/internal/_isFormatDate.js";
import * as __typia_transform__validateReport from "typia/lib/internal/_validateReport.js";
import typia, { tags } from 'typia';
type DateParams = {
    date: string & tags.Format<'date'>;
    status: 'ok' | 'pn' | 'ng';
};
export interface RegisterParticipantRequest {
    name: string & tags.MinLength<1> & tags.MaxLength<256>;
    params: DateParams[];
}
export const RegisterParticipantRequestValidate = (() => { const _io0 = (input: any): boolean => "string" === typeof input.name && (1 <= input.name.length && input.name.length <= 256) && (Array.isArray(input.params) && input.params.every((elem: any) => "object" === typeof elem && null !== elem && _io1(elem))); const _io1 = (input: any): boolean => "string" === typeof input.date && __typia_transform__isFormatDate._isFormatDate(input.date) && ("ok" === input.status || "pn" === input.status || "ng" === input.status); const _vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.name && (1 <= input.name.length || _report(_exceptionable, {
        path: _path + ".name",
        expected: "string & MinLength<1>",
        value: input.name
    })) && (input.name.length <= 256 || _report(_exceptionable, {
        path: _path + ".name",
        expected: "string & MaxLength<256>",
        value: input.name
    })) || _report(_exceptionable, {
        path: _path + ".name",
        expected: "(string & MinLength<1> & MaxLength<256>)",
        value: input.name
    }), (Array.isArray(input.params) || _report(_exceptionable, {
        path: _path + ".params",
        expected: "Array<DateParams>",
        value: input.params
    })) && input.params.map((elem: any, _index2: number) => ("object" === typeof elem && null !== elem || _report(_exceptionable, {
        path: _path + ".params[" + _index2 + "]",
        expected: "DateParams",
        value: elem
    })) && _vo1(elem, _path + ".params[" + _index2 + "]", true && _exceptionable) || _report(_exceptionable, {
        path: _path + ".params[" + _index2 + "]",
        expected: "DateParams",
        value: elem
    })).every((flag: boolean) => flag) || _report(_exceptionable, {
        path: _path + ".params",
        expected: "Array<DateParams>",
        value: input.params
    })].every((flag: boolean) => flag); const _vo1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.date && (__typia_transform__isFormatDate._isFormatDate(input.date) || _report(_exceptionable, {
        path: _path + ".date",
        expected: "string & Format<\"date\">",
        value: input.date
    })) || _report(_exceptionable, {
        path: _path + ".date",
        expected: "(string & Format<\"date\">)",
        value: input.date
    }), "ok" === input.status || "pn" === input.status || "ng" === input.status || _report(_exceptionable, {
        path: _path + ".status",
        expected: "(\"ng\" | \"ok\" | \"pn\")",
        value: input.status
    })].every((flag: boolean) => flag); const __is = (input: any): input is RegisterParticipantRequest => "object" === typeof input && null !== input && _io0(input); let errors: any; let _report: any; return (input: any): import("typia").IValidation<RegisterParticipantRequest> => {
    if (false === __is(input)) {
        errors = [];
        _report = (__typia_transform__validateReport._validateReport as any)(errors);
        ((input: any, _path: string, _exceptionable: boolean = true) => ("object" === typeof input && null !== input || _report(true, {
            path: _path + "",
            expected: "RegisterParticipantRequest",
            value: input
        })) && _vo0(input, _path + "", true) || _report(true, {
            path: _path + "",
            expected: "RegisterParticipantRequest",
            value: input
        }))(input, "$input", true);
        const success = 0 === errors.length;
        return success ? {
            success,
            data: input
        } : {
            success,
            errors,
            data: input
        } as any;
    }
    return {
        success: true,
        data: input
    } as any;
}; })();
