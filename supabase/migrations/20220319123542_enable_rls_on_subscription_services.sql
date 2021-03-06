-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

ALTER TABLE IF EXISTS public.service_subscriptions
    ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.service_subscriptions FROM anon;
REVOKE ALL ON TABLE public.service_subscriptions FROM authenticated;
REVOKE ALL ON TABLE public.service_subscriptions FROM postgres;
REVOKE ALL ON TABLE public.service_subscriptions FROM service_role;
GRANT ALL ON TABLE public.service_subscriptions TO authenticated;

GRANT ALL ON TABLE public.service_subscriptions TO postgres;

GRANT ALL ON TABLE public.service_subscriptions TO service_role;

CREATE POLICY user_crud_service_subscriptions
    ON public.service_subscriptions
    AS PERMISSIVE
    FOR ALL
    TO public
    USING ((auth.uid() = user_id));
