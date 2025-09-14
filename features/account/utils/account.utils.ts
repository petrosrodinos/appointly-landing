import { CATEGORY_OPTIONS } from "@/constants/account-category-options";

export const getCategoryLabel = (categoryValue: string) => {
    const category = CATEGORY_OPTIONS.find((option) => option.value === categoryValue);
    return category ? category.label : categoryValue;
};