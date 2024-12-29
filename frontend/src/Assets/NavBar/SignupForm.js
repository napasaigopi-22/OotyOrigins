import { Button, FormControlLabel, FormHelperText, Grid2, Radio, RadioGroup, TextField, Typography } from "@mui/material";

function SignupForm({handleChange, signup, formData, errors, isuererror})
{

    return(
 
    <form className='form' onSubmit={signup}>
                                                <Typography variant="h5" gutterBottom>
                                                    User Information
                                                </Typography>

                                                <Grid2 container spacing={2}>
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="username"
                                                            name="username"
                                                            label="Username"
                                                            variant="outlined"
                                                            value={formData.username}
                                                            onChange={handleChange}
                                                            error={!!errors.username}
                                                            helperText={errors.username}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                           
                                                        />
                                                    </Grid2>

                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="email"
                                                            name="email"
                                                            label="Email"
                                                            variant="outlined"
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            error={!!errors.email}
                                                            helperText={errors.email}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                          
                                                            
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="password"
                                                            name="password"
                                                            label="Password"
                                                            variant="outlined"
                                                            type="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            error={!!errors.password}
                                                            helperText={errors.password}
                                                            required
                                                            inputProps={{ minLength: 8 }}
                                                            fullWidth
                                                            margin="normal"
                                                           
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6}>
                                                        <Typography variant="h6" gutterBottom>
                                                            Account Type
                                                        </Typography>

                                                        <RadioGroup
                                                            id="IsUser"
                                                            name="isUser"
                                                            value={formData.isUser} // Ensure this is a string like "true" or "false"
                                                            onChange={handleChange}
                                                            row // Aligns radio buttons horizontally
                                                        >
                                                            <FormControlLabel
                                                                value="true" // Value for User
                                                                control={<Radio />}
                                                                label="User"
                                                            />
                                                            <FormControlLabel
                                                                value="false" // Value for Seller
                                                                control={<Radio />}
                                                                label="Seller"
                                                            />
                                                        </RadioGroup>

                                                        {/* Error Handling */}
                                                        {isuererror && <FormHelperText error>{isuererror}</FormHelperText>}
                                                    </Grid2>
                                                </Grid2>
                                                <Typography variant="h6" gutterBottom>
                                                    Address
                                                </Typography>
                                                <Grid2 container spacing={2}>
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="street"
                                                            name="street"
                                                            label="Street"
                                                            variant="outlined"
                                                            value={formData.street}
                                                            onChange={handleChange}
                                                            error={!!errors.street}
                                                            helperText={errors.street}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                           
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="city"
                                                            name="city"
                                                            label="City"
                                                            variant="outlined"
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                            error={!!errors.city}
                                                            helperText={errors.city}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                         
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6} >
                                                        <TextField
                                                            id="state"
                                                            name="state"
                                                            label="State"
                                                            variant="outlined"
                                                            value={formData.state}
                                                            onChange={handleChange}
                                                            error={!!errors.state}
                                                            helperText={errors.state}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                           
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="zipcode"
                                                            name="zipcode"
                                                            label="Zip Code"
                                                            variant="outlined"
                                                            value={formData.zipcode}
                                                            onChange={handleChange}
                                                            error={!!errors.zipcode}
                                                            helperText={errors.zipcode}
                                                            inputProps={{ pattern: "\\d{6}" }}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                           
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="phone"
                                                            name="phone"
                                                            label="Phone"
                                                            variant="outlined"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            error={!!errors.phone}
                                                            helperText={errors.phone}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                          
                                                        />
                                                    </Grid2>
                                                </Grid2>
                                                <Grid2 item xs={12}>
                                                    <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    type="submit"
                                                    >
                                                        Create
                                                    </Button>
                                                </Grid2>
                                            </form>
                                    
    );
}

export default SignupForm;