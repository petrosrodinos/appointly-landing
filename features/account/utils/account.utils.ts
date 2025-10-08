import { CATEGORY_OPTIONS } from "@/constants/account-category-options";

export const getCategoryLabel = (categoryValue: string) => {
    const category = CATEGORY_OPTIONS.find((option) => option.value === categoryValue);
    return category ? category.label : categoryValue;
};

export const getBusinessType = (category: string): string => {
    return (
        CATEGORY_OPTIONS.find((option) => option.value === category)?.businessType ||
        "LocalBusiness"
    );
};