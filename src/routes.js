//import vistas
import Home from './components/Home.vue'
import Movie from './components/Movie.vue'
import NotFound from './components/NotFound.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import Categories  from './components/Categories.vue'
import CategoriesId  from './components/Id.vue'
//exportamos las rutas
export const routes =[
    {path:'/',component:Home},
    {path:'/movies/:id',component:Movie, props: true},
    {path:'/categories/:id',component:CategoriesId},
    {path:'/about',component:About},
    {path:'/contact',component:Contact},
    {path:'/categories',component:Categories},
	{path:'*',component:NotFound}
]