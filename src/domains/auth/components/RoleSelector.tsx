import { Grid, Paper, Box, Typography } from '@mui/material';
import { ROLE_INFO } from '../constants/auth.constants';
import { RoleSelectorProps, UserRole } from '../types/auth.types';

const RoleSelector = ({ selectedRole, onRoleSelect }: RoleSelectorProps) => {
    const roles = Object.entries(ROLE_INFO).map(([key, info]) => ({
        id: key as UserRole,
        ...info,
    }));

    return (
        <Grid container spacing={3}>
            {roles.map((role) => (
                <Grid size={{ xs: 12, md: 6 }} key={role.id}>
                    <Paper
                        elevation={selectedRole === role.id ? 8 : 2}
                        sx={{
                            p: 3,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: '2px solid',
                            borderColor: selectedRole === role.id ? 'primary.main' : 'grey.200',
                            backgroundColor: selectedRole === role.id ? '#fff9f2' : 'white',
                            borderRadius: 3,
                            height: '100%',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 24px rgba(232, 152, 48, 0.2)',
                                borderColor: 'primary.main',
                            },
                        }}
                        onClick={() => onRoleSelect(role.id)}
                    >
                        {/* 역할 아이콘 */}
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                backgroundColor: selectedRole === role.id ? 'primary.main' : 'grey.100',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                                transition: 'all 0.3s ease',
                            }}
                        >
              <span
                  className="material-icons"
                  style={{
                      fontSize: '28px',
                      color: selectedRole === role.id ? 'white' : '#e89830'
                  }}
              >
                {role.icon}
              </span>
                        </Box>

                        {/* 역할 제목 */}
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 1,
                                fontSize: '1.25rem',
                            }}
                        >
                            {role.title}
                        </Typography>

                        {/* 역할 설명 */}
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                lineHeight: 1.6,
                            }}
                        >
                            {role.description}
                        </Typography>

                        {/* 기능 목록 */}
                        <Box sx={{ mt: 2 }}>
                            {role.features.map((feature, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        mb: 1
                                    }}
                                >
                  <span
                      className="material-icons"
                      style={{
                          fontSize: '16px',
                          color: '#e89830',
                          marginRight: '8px',
                          marginTop: '2px',
                          flexShrink: 0
                      }}
                  >
                    check_circle
                  </span>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: '0.875rem',
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {feature}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default RoleSelector;