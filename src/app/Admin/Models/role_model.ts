export class Role{
    id_t5_1_m_user_roles!: string;
    t5_1_m_user_roles_name!: string;
    t5_1_m_all_location_access!: number;
    t5_1_m_all_location_type!: number;
    t5_1_m_only_assigned_location!: number;
    inserted_by!: string | null;
    inserted_date!: string;
    updated_by!: string | null;
    updated_date!: string;
}

export class ApiResponse {
    status!: number;
    message!: string;
    data!: {
      Items: Role[];
    };
}