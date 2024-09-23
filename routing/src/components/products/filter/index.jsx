import { Box, Input, ListItemDecorator, Option, Select } from "@mui/joy";
import React from "react";
import { useSearchParams } from "react-router-dom";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

let timeoutId = null;
export const ProductsFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultSearchValue = searchParams.get("searchStr") || "";

    const handleSearch = (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            searchParams.set("searchStr", value );
            setSearchParams({ searchStr: value });
        }, 400);
    };

    const handleSortChange = (value) => {
        searchParams.set("sort", value);
        setSearchParams(searchParams);
    };

    const options = [
        { value: "name-asc", label: "Name", icon: <NorthIcon fontSize="12" /> },
        {
            value: "name-decs",
            label: "Name",
            icon: <SouthIcon fontSize="12" />,
        },
        {
            value: "price-asc",
            label: "Price",
            icon: <NorthIcon fontSize="12" />,
        },
        {
            value: "price-decs",
            label: "Price",
            icon: <SouthIcon fontSize="12" />,
        },
    ];
    function renderValue(option) {
        if (!option) return null;
        return (
            <React.Fragment>
                <ListItemDecorator sx={{ mr: 3 }}>
                    {options.find((o) => o.value === option.value)?.icon}
                </ListItemDecorator>
                {option.label}
            </React.Fragment>
        );
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Input
                    sx={{ width: 350 }}
                    defaultValue={defaultSearchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search Products"
                />
            </Box>
            <Select
                placeholder="Select Sort"
                sx={{ width: 150 }}
                renderValue={renderValue}
                onChange={(_, value) => {
                    handleSortChange(value);
                }}
            >
                {options.map((option) => (
                    <Option
                        key={option.value}
                        value={option.value}
                        label={option.label}
                    >
                        <ListItemDecorator>{option.icon}</ListItemDecorator>
                        {option.label}
                    </Option>
                ))}
            </Select>
        </Box>
    );
};
