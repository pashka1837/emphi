type LeadType = {
  account_id: number;
  closed_at: any;
  closest_task_at: number;
  created_at: number;
  created_by: number;
  custom_fields_values: any;
  group_id: number;
  id: number;
  is_deleted: boolean;
  labor_cost: any;
  loss_reason_id: any;
  name: string;
  pipeline_id: number;
  price: number;
  responsible_user_id: number;
  score: any;
  status_id: number;
  updated_at: number;
  updated_by: number;
  _embedded: any;
};

type ContactType = {
  id: number;
  name: string;
  custom_fields_values: any[];
};

type TableLeadDataType = {
  id: number;
  title: string;
  budget: number;
  contactName: any;
  contactPhone: any;
};
