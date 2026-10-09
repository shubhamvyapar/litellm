import { $api } from "@/lib/http/api";
import { all_admin_roles } from "@/utils/roles";
import useAuthorized from "@/app/(dashboard)/hooks/useAuthorized";
import type { components } from "@/lib/http/schema";

export type EndUser = components["schemas"]["CustomerResponse"];

export const CUSTOMER_LIST_LIMIT = 1000;

export const useCustomers = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const { accessToken, userRole } = useAuthorized();
  return $api.useQuery(
    "get",
    "/customer/list",
    { params: { query: { limit: CUSTOMER_LIST_LIMIT } } },
    {
      enabled: enabled && Boolean(accessToken) && all_admin_roles.includes(userRole!),
      select: (data) => data ?? [],
    },
  );
};
