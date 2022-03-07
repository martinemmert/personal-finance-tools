import { SubmissionContext, useForm } from "vee-validate";
import { object, SchemaOf, string } from "yup";
import { useAuthStore } from "_modules/auth/hooks/use-auth-store";

export type FormValues = { email: string };
export type FormContextActions = SubmissionContext<FormValues>;

const LoginFormSchema: SchemaOf<FormValues> = object({
  email: string().email().required(),
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

export function useLoginForm(eventEmitter: EventEmitter) {
  const store = useAuthStore();

  const { handleSubmit, handleReset, isSubmitting } = useForm<FormValues>({
    validationSchema: LoginFormSchema,
  });

  const _handleSubmit = handleSubmit(async (values, actions) => {
    eventEmitter("submit", values, actions);
    await store.supabase.auth.signIn(values, {
      redirectTo: "http://localhost:3000/refresh-session",
      shouldCreateUser: false
    });
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