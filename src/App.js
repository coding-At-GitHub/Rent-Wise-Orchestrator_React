import React, { useState } from "react";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material"; // Icons
import { PropertyData } from "./mockData";

function App() {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [tenantDialogOpen, setTenantDialogOpen] = useState(false);
    const [editTenantDialogOpen, setEditTenantDialogOpen] = useState(false);
    const [tenants, setTenants] = useState([]);
    const [editedTenant, setEditedTenant] = useState({ id: null, name: "" });

    const handlePropertyClick = (property) => {
        setSelectedProperty(property);
        setTenants(property.tenants);
        setEditedTenant({ id: null, name: "" });
    };

    const handleAddTenant = () => {
        setEditedTenant({ id: null, name: "" });
        setTenantDialogOpen(true);
    };

    const handleSaveTenant = () => {
        if (editedTenant.name.trim() !== "") {
            const newTenant = {...editedTenant, id: Date.now() };
            setTenants([...tenants, newTenant]);
        }
        setTenantDialogOpen(false);
        setEditedTenant({ id: null, name: "" });
    };

    const handleEditTenant = (tenant) => {
        setEditedTenant({...tenant });
        setEditTenantDialogOpen(true);
    };

    const handleSaveEditedTenant = () => {
        if (editedTenant.name.trim() !== "") {
            const updatedTenants = tenants.map((tenant) =>
                tenant.id === editedTenant.id ?
                {...tenant, name: editedTenant.name } :
                tenant
            );
            setTenants(updatedTenants);
            setEditTenantDialogOpen(false);
            setEditedTenant({ id: null, name: "" });
        }
    };

    const handleRemoveTenant = (tenant) => {
        const updatedTenants = tenants.filter((t) => t !== tenant);
        setTenants(updatedTenants);
        setEditedTenant({ id: null, name: "" });
    };

    return ( <
        Container style = {
            {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }
        } >
        <
        Typography variant = "h4"
        gutterBottom >
        Property Management Demo { " " } <
        /Typography>{" "} <
        div style = {
            { display: "flex" } } >
        <
        div style = {
            { flex: 1 } } >
        <
        Typography variant = "h6"
        gutterBottom >
        Properties { " " } <
        /Typography>{" "} <
        List > { " " } {
            PropertyData.map((property) => ( <
                ListItem key = { property.id }
                button onClick = {
                    () => handlePropertyClick(property) } >
                <
                ListItemText primary = { property.name }
                />{" "} <
                /ListItem>
            ))
        } { " " } <
        /List>{" "} <
        /div>{" "} <
        Divider orientation = "vertical"
        flexItem / >
        <
        div style = {
            { flex: 2, paddingLeft: "20px" } } > { " " } {
            selectedProperty && ( <
                >
                <
                Typography variant = "h6"
                gutterBottom >
                Property Details { " " } <
                /Typography>{" "} <
                Typography variant = "body1"
                gutterBottom >
                Name: { selectedProperty.name } { " " } <
                /Typography>{" "} <
                Typography variant = "body1"
                gutterBottom >
                Address: { selectedProperty.address } { " " } <
                /Typography>{" "} <
                Typography variant = "body1"
                gutterBottom >
                Total Tenants: { tenants.length } { " " } <
                /Typography>{" "} <
                Button variant = "outlined"
                onClick = { handleAddTenant }
                startIcon = { < Add / > } >
                Add Tenant { " " } <
                /Button>{" "} <
                Typography variant = "h6"
                style = {
                    { marginTop: "20px" } } >
                Tenants { " " } <
                /Typography>{" "} <
                List > { " " } {
                    tenants.map((tenant) => ( <
                        ListItem key = { tenant.id }
                        sx = {
                            {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }
                        } >
                        <
                        ListItemText primary = { tenant.name }
                        />{" "} <
                        div >
                        <
                        IconButton color = "primary"
                        onClick = {
                            () => handleEditTenant(tenant) } >
                        <
                        Edit / >
                        <
                        /IconButton>{" "} <
                        IconButton color = "secondary"
                        onClick = {
                            () => handleRemoveTenant(tenant) } >
                        <
                        Delete / >
                        <
                        /IconButton>{" "} <
                        /div>{" "} <
                        /ListItem>
                    ))
                } { " " } <
                /List>{" "} <
                />
            )
        } { " " } <
        /div>{" "} <
        /div>{" "} <
        Dialog open = { tenantDialogOpen }
        onClose = {
            () => setTenantDialogOpen(false) } >
        <
        DialogTitle > Add Tenant < /DialogTitle>{" "} <
        DialogContent >
        <
        TextField label = "Tenant Name"
        fullWidth value = { editedTenant.name }
        onChange = {
            (e) =>
            setEditedTenant({...editedTenant, name: e.target.value })
        }
        />{" "} <
        /DialogContent>{" "} <
        DialogActions >
        <
        Button onClick = {
            () => setTenantDialogOpen(false) } > Cancel < /Button>{" "} <
        Button onClick = { handleSaveTenant } > Save < /Button>{" "} <
        /DialogActions>{" "} <
        /Dialog>{" "} <
        Dialog open = { editTenantDialogOpen }
        onClose = {
            () => setEditTenantDialogOpen(false) } >
        <
        DialogTitle > Edit Tenant < /DialogTitle>{" "} <
        DialogContent >
        <
        TextField label = "Tenant Name"
        fullWidth value = { editedTenant.name }
        onChange = {
            (e) =>
            setEditedTenant({...editedTenant, name: e.target.value })
        }
        />{" "} <
        /DialogContent>{" "} <
        DialogActions >
        <
        Button onClick = {
            () => setEditTenantDialogOpen(false) } > { " " }
        Cancel { " " } <
        /Button>{" "} <
        Button onClick = { handleSaveEditedTenant } > Save < /Button>{" "} <
        /DialogActions>{" "} <
        /Dialog>{" "} <
        /Container>
    );
}

export default App;