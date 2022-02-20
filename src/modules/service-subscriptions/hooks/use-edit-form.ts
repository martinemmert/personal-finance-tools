import { SubmissionContext, useForm } from "vee-validate";
import {
  ServiceSubscriptionFormData,
  ServiceSubscriptionSchema,
} from "_modules/service-subscriptions/store";
import { useInitialValues } from "_modules/service-subscriptions/hooks/use-initial-values";
import { useUpdateAction } from "_modules/service-subscriptions/hooks/use-update-action";
import { useCreateAction } from "_modules/service-subscriptions/hooks/use-create-action";

type FormValues = ServiceSubscriptionFormData;
type FormActions = SubmissionContext<FormValues>;

export type SubmitHandler = (
  values: FormValues,
  actions: SubmissionContext<FormValues>
) => void | Promise<void>;

export type SubmittedHandler = (
  values: FormValues,
  actions: SubmissionContext<FormValues>
) => void | Promise<void>;

export type ResetHandler = () => void;

export type EventEmitter = {
  (e: "submit", values: FormValues, actions: FormActions): void;
  (e: "submitted", values: FormValues, actions: FormActions): void;
};

export function useEditForm(eventEmitter: EventEmitter) {
  const initialValues = useInitialValues();
  const updateItem = useUpdateAction();
  const createItem = useCreateAction();

  const { handleSubmit, handleReset, isSubmitting } = useForm<FormValues>({
    validationSchema: ServiceSubscriptionSchema,
    initialValues,
  });

  async function _handleReset() {
    handleReset();
  }

  const _handleSubmit = handleSubmit(async (values, actions) => {
    eventEmitter("submit", values, actions);
    if (initialValues?.id) {
      await updateItem(initialValues.id, values);
    } else {
      await createItem(values);
    }
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
    handleReset: _handleReset,
  };
}
