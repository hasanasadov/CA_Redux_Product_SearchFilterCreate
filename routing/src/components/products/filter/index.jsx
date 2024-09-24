import {
    Avatar,
    Box,
    
    Input,
    ListItemDecorator,
    Option,
    Select,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

let timeoutId = null;
export const ProductsFilter = () => {
    const [creators, setCreators] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultSearchValue = searchParams.get("searchStr") || "";
    const defaultSortValue = searchParams.get("sort") || "";
    const defaultCreatorsValue = searchParams.get("creators") || "";
    const handleSearch = (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            searchParams.set("searchStr", value);
            setSearchParams(searchParams);
        }, 400);
    };

    const handleSortChange = (value) => {
        searchParams.set("sort", value);
        setSearchParams(searchParams);
    };

    const handleCreatorChange = (value) => {
        const creators = value.join(",");
        searchParams.set("creators", creators);
        const defaultValue = searchParams.get("creators") || "";
        setSearchParams(searchParams);
        
    };

    const options = [
        { value: "name-asc", label: "Name", icon: <NorthIcon fontSize="12" /> },
        {
            value: "name-desc",
            label: "Name",
            icon: <SouthIcon fontSize="12" />,
        },
        {
            value: "price-asc",
            label: "Price",
            icon: <NorthIcon fontSize="12" />,
        },
        {
            value: "price-desc",
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

    async function getCreators() {
        const response = await fetch("http://localhost:3000/api/creators");
        const data = await response.json();
        setCreators(data);
    }

    useEffect(() => {
        getCreators();
    }, []);

    const creatorOptions = creators.map((creator) => {
        return {
            value: creator.id,
            label: creator.name,
            src: creator.profileImgPath,
        };
    });
    return (
        <Box>
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
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
                    defaultValue={defaultSortValue}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, mt: 2 }}>
                <Select
                    multiple
                    placeholder="Select Creator"
                    sx={{ width: 350 }}
                    onChange={(_, value) => {
                        handleCreatorChange(value);
                    }}
                    defaultValue={defaultCreatorsValue.split(",")}
                >
                    {creatorOptions.map((option) => (
                        <Option
                            key={option.value}
                            value={option.value}
                            label={option.label}
                        >
                            <Avatar src={option.src} />
                            <ListItemDecorator>{option.icon}</ListItemDecorator>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            </Box>
        </Box>
    );
};
