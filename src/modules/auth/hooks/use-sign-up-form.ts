import { SubmissionContext, useForm } from "vee-validate";
import { boolean, object, SchemaOf, string } from "yup";
import { useAuthStore } from "_modules/auth/hooks/use-auth-store";

export type FormValues = { email: string; terms: boolean };
export type FormContextActions = SubmissionContext<FormValues>;

const SignUpFormSchema: SchemaOf<FormValues> = object({
    email: string().email().required(),
    terms: boolean().required("Field must be checked").oneOf([true], "Field must be checked"),
});

export type SubmitHandler = (
    values: FormValues,
    actions: FormContextActions
) => void | Promise<void>;

export type SubmittedHandler = (
    values: FormValues,
    actions: FormContextActions
) => void | Promise<void>;

export type ResetHandler = () => void;

export type EventEmitter = {
    (e: "submit", values: FormValues, actions: FormContextActions): void;
    (e: "submitted", values: FormValues, actions: FormContextActions): void;
};

export function useSignUpForm(eventEmitter: EventEmitter) {
    const store = useAuthStore();

    const {handleSubmit, handleReset, isSubmitting} = useForm<FormValues>({
        validationSchema: SignUpFormSchema,
    });

    const _handleSubmit = handleSubmit(async (values, actions) => {
        eventEmitter("submit", values, actions);
        await store.supabase.auth.signIn({
            email: values.email
        }, {
            redirectTo: "http://localhost:3000/refresh-session",
            shouldCreateUser: true,
            // data: {
            //     termsAccepted: values.terms,
            //     termsAcceptedDate: Date.now()
            // }
        })
        eventEmitter("submitted", values, actions);
    });

    async function _deferredHandleSubmit(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        if (isSubmitting.value) return;
        await _handleSubmit(event);
    }

    return {
        handleSubmit: _deferredHandleSubmit,
        handleReset,
    };
}
