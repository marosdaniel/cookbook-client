export enum ENonProtectedRoutes {
  HOME = '/',
  RECIPES = '/recipes',
  RECIPE_DETAILS = '/recipes/:id',
  SIGNIN = '/signin',
  ARTICLES = '/articles',
  CONTACT_US = '/contact-us',
  USERS = '/users',
  BLOGS = '/blogs',
  BLOG_DETAILS = '/blogs/:id',
  TIPS_AND_TRICKS = '/tips-and-tricks',
}

export enum EProtectedRoutes {
  ADMIN = '/admin',
  ADMIN_UNITS = '/admin/units',
  ADMIN_USERS = '/admin/users',
  ADMIN_CATEGORIES = '/admin/categories',
  ADMIN_LABELS = '/admin/labels',
  ME = '/me',
  PROFILE = '/me/profile',
  MY_RECIPES = '/me/recipes',
  FAVORITES = '/me/favorites',
  NEW_RECIPE = '/new-recipe',
}
