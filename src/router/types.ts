export enum ENonProtectedRoutes {
  HOME = '/',
  RECIPES = '/recipes',
  RECIPE_DETAILS = '/recipes/:id',
  SIGNIN = '/signin',
  ARTICLES = '/articles',
  CONTACT_US = '/contact-us',
}

export enum EProtectedRoutes {
  ADMIN = '/admin',
  PROFILE = '/me/profile',
  MY_RECIPES = '/me/recipes',
  NEW_RECIPE = '/new-recipe',
}
