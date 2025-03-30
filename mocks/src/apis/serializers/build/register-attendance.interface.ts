import * as __typia_transform__isFormatDate from "typia/lib/internal/_isFormatDate.js";
import * as __typia_transform__validateReport from "typia/lib/internal/_validateReport.js";
import typia, { tags } from 'typia';
export interface RegisterAttendanceRequest {
    title: string & tags.MinLength<1> & tags.MaxLength<128>;
    description: string & tags.MaxLength<1000>;
    candidateDate: Array<string & tags.Format<'date'>>;
}
export const RegisterAttendanceRequestValidate = (() => { const _io0 = (input: any): boolean => "string" === typeof input.title && (1 <= input.title.length && input.title.length <= 128) && ("string" === typeof input.description && input.description.length <= 1000) && (Array.isArray(input.candidateDate) && input.candidateDate.every((elem: any) => "string" === typeof elem && __typia_transform__isFormatDate._isFormatDate(elem))); const _vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.title && (1 <= input.title.length || _report(_exceptionable, {
        path: _path + ".title",
        expected: "string & MinLength<1>",
        value: input.title
    })) && (input.title.length <= 128 || _report(_exceptionable, {
        path: _path + ".title",
        expected: "string & MaxLength<128>",
        value: input.title
    })) || _report(_exceptionable, {
        path: _path + ".title",
        expected: "(string & MinLength<1> & MaxLength<128>)",
        value: input.title
    }), "string" === typeof input.description && (input.description.length <= 1000 || _report(_exceptionable, {
        path: _path + ".description",
        expected: "string & MaxLength<1000>",
        value: input.description
    })) || _report(_exceptionable, {
        path: _path + ".description",
        expected: "(string & MaxLength<1000>)",
        value: input.description
    }), (Array.isArray(input.candidateDate) || _report(_exceptionable, {
        path: _path + ".candidateDate",
        expected: "Array<string & Format<\"date\">>",
        value: input.candidateDate
    })) && input.candidateDate.map((elem: any, _index2: number) => "string" === typeof elem && (__typia_transform__isFormatDate._isFormatDate(elem) || _report(_exceptionable, {
        path: _path + ".candidateDate[" + _index2 + "]",
        expected: "string & Format<\"date\">",
        value: elem
    })) || _report(_exceptionable, {
        path: _path + ".candidateDate[" + _index2 + "]",
        expected: "(string & Format<\"date\">)",
        value: elem
    })).every((flag: boolean) => flag) || _report(_exceptionable, {
        path: _path + ".candidateDate",
        expected: "Array<string & Format<\"date\">>",
        value: input.candidateDate
    })].every((flag: boolean) => flag); const __is = (input: any): input is RegisterAttendanceRequest => "object" === typeof input && null !== input && _io0(input); let errors: any; let _report: any; return (input: any): import("typia").IValidation<RegisterAttendanceRequest> => {
    if (false === __is(input)) {
        errors = [];
        _report = (__typia_transform__validateReport._validateReport as any)(errors);
        ((input: any, _path: string, _exceptionable: boolean = true) => ("object" === typeof input && null !== input || _report(true, {
            path: _path + "",
            expected: "RegisterAttendanceRequest",
            value: input
        })) && _vo0(input, _path + "", true) || _report(true, {
            path: _path + "",
            expected: "RegisterAttendanceRequest",
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
