import { InferType, number, object, string } from "yup";
import { SubmissionContext, useForm } from "vee-validate";

const validationSchema = object({
  service_name: string().required(),
  subscription_plan: string(),
  billing_period: string()
    .required()
    .matches(/weekly|monthly/),
  price: number().required().min(0),
});

export type FormValues = InferType<typeof validationSchema>;

export type SubmitHandler = (
  values: FormValues,
  actions: SubmissionContext<FormValues>
) => void | Promise<void>;

export type SubmittedHandler = (
  values: FormValues,
  actions: SubmissionContext<FormValues>
) => void | Promise<void>;

export type ResetHandler = () => void;

type EventEmitter = {
  (e: "submit", values: FormValues, actions: SubmissionContext<FormValues>): void;
  (e: "submitted", values: FormValues, actions: SubmissionContext<FormValues>): void;
  (e: "resetted"): void;
};

export function useEditForm(
  submitHandler: SubmitHandler,
  eventEmitter: EventEmitter,
  resetAfterSubmit: boolean = true
) {
  const { handleSubmit, handleReset, isSubmitting } = useForm<FormValues>({ validationSchema });

  async function _handleReset() {
    handleReset();
    eventEmitter("resetted");
  }

  const _handleSubmit = handleSubmit(async (values, actions) => {
    eventEmitter("submit", values, actions);
    await submitHandler(values, actions);
    eventEmitter("submitted", values, actions);
    if (resetAfterSubmit) await _handleReset();
  });

  async function _deferredHandleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (isSubmitting.value) return;
    await _handleSubmit(event);
  }

  return {
    handleSubmit: _deferredHandleSubmit,
    handleReset: _handleReset,
  };
}
