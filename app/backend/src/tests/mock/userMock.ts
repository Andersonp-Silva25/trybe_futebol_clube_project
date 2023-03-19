const adminUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const commonUser = {
  id: 2,
  username: 'Torcedor 3600',
  role: 'user',
  email: 'user@user.com',
  password: 'secret_user',
};

const invalidUser = {
  email: 'emailInvalido',
  password: 'hakunaMatata'
}

const emptyUser = {
  email: '',
  password: 'hakunaMatata'
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY3OTI1NTQwMCwiZXhwIjoxNjc5MjU2MzAwfQ.6XVtETH07X_qS4AXkVVQ3gPZCEnYj2RK_C6ERAvupAw"

export {adminUser, commonUser, invalidUser, emptyUser, token}