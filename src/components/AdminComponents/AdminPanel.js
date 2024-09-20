import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText, CssBaseline, Typography, Box } from '@mui/material';
import AboutUsAdmin from './AboutUsAdmin';
import UsersAdmin from './UsersAdmin';
import ContactUsAdmin from './ContactUsAdmin';
import PhoneDirectoryAdmin from './PhoneDirectoryAdmin';
import PolicyAdmin from './PolicyAdmin';
import PopularRouteAdmin from './PopularRouteAdmin';
import GalleryAdmin from './GalleryAdmin';
import TouristDestinationAdmin from './TouristDestinationAdmin';
import FAQAdmin from './FAQAdmin'; // Import the new component

const drawerWidth = 240;

const AdminPanel = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button component={Link} to="/admin/about-us">
                            <ListItemText primary="About Us" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/users">
                            <ListItemText primary="Users" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/contact-us">
                            <ListItemText primary="Contact Us" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/phone-directory">
                            <ListItemText primary="Phone Directory" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/policy">
                            <ListItemText primary="Policy" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/popular-routes">
                            <ListItemText primary="Popular Routes" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/gallery">
                            <ListItemText primary="Gallery" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/tourist-destinations">
                            <ListItemText primary="Tourist Destinations" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/faq"> {/* Add new drawer item */}
                            <ListItemText primary="FAQs" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: `${drawerWidth}px` }}
            >
                <Toolbar />
                <Routes>
                    <Route path="about-us" element={<AboutUsAdmin />} />
                    <Route path="users" element={<UsersAdmin />} />
                    <Route path="contact-us" element={<ContactUsAdmin />} />
                    <Route path="phone-directory" element={<PhoneDirectoryAdmin />} />
                    <Route path="policy" element={<PolicyAdmin />} />
                    <Route path="popular-routes" element={<PopularRouteAdmin />} />
                    <Route path="gallery" element={<GalleryAdmin />} />
                    <Route path="tourist-destinations" element={<TouristDestinationAdmin />} />
                    <Route path="faq" element={<FAQAdmin />} /> {/* Add new route */}
                </Routes>
            </Box>
        </Box>
    );
};

export default AdminPanel;