import Vue from 'vue';
import Router from 'vue-router';
import editGuard from './editGuard';

const HomePage = () => import('@/components/HomePage');
// const ORNL404 = () => import('@/components/ORNL404');
const SANS1DFit = () => import('@/components/FitData/SANS1D');
const SANS1DBrowse = () => import('@/components/BrowseData/SANS1D');
const SANS1DStitch = () => import('@/components/StitchData/SANS');
const SANS2DGraph = () => import('@/components/Chart2D/SANS2D');
const TASFit = () => import('@/components/FitData/TAS');
const TASBrowse = () => import('@/components/BrowseData/TAS');
const TASCombine = () => import('@/components/CombineData/TAS');
const EditChart = () => import('@/components/EditChart/EditChart');

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '*',
    //   name: 'ORNL404',
    //   component: ORNL404,
    //   meta: { title: '404' },
    // },
    {
      path: '*',
      redirect: '/HomePage',
    },
    {
      path: '/',
      redirect: '/HomePage',
    },
    {
      path: '/EditChart',
      name: 'EditChart',
      component: EditChart,
      meta: {
        title: 'Edit Chart',
        sidebar: 'Sidebar404',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'Edit', href: '/', disabled: true },
        ],
      },
      beforeEnter: editGuard,
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/Documentation',
      redirect: '/HomePage',
    },
    {
      path: '/SANS',
      redirect: '/HomePage',
    },
    {
      path: '/SANS/Fit',
      name: 'SANS1D-Fit',
      component: SANS1DFit,
      meta: {
        title: 'SANS1D Fit',
        group: 'SANS',
        subgroup: 'SANS1D',
        sidebar: 'SidebarSANS1DFit',
        feature: 'Fit',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'SANS', href: '/', disabled: false },
          { text: 'Fit', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/SANS/Browse',
      name: 'SANS1D-Browse',
      component: SANS1DBrowse,
      meta: {
        title: 'SANS1D-Browse',
        group: 'SANS',
        subgroup: 'SANS1D',
        sidebar: 'SidebarSANS1DBrowse',
        feature: 'Browse',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'SANS', href: '/SANS', disabled: false },
          { text: 'Browse', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/SANS/Stitch',
      name: 'SANS1D-Stitch',
      component: SANS1DStitch,
      meta: {
        title: 'SANS1D Stitch',
        group: 'SANS',
        subgroup: 'SANS1D',
        sidebar: 'SidebarSANS1DStitch',
        feature: 'Stitch',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'SANS', href: '/SANS', disabled: false },
          { text: 'Stitch', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/SANS/SANS2D',
      name: 'SANS2D',
      component: SANS2DGraph,
      meta: {
        title: 'SANS2D',
        group: 'SANS',
        subgroup: 'SANS2D',
        sidebar: 'SidebarSANS2D',
        feature: '2D',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'SANS', href: '/SANS', disabled: false },
          { text: 'Plot 2D', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/TAS',
      redirect: '/HomePage',
    },
    {
      path: '/TAS/Fit',
      name: 'TAS-Fit',
      component: TASFit,
      meta: {
        title: 'TAS-Fit',
        group: 'TAS',
        sidebar: 'SidebarTASFit',
        feature: 'Fit',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'TAS', href: '/TAS', disabled: false },
          { text: 'Fit', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/TAS/Browse',
      name: 'TAS-Browse',
      component: TASBrowse,
      meta: {
        title: 'TAS-Browse',
        group: 'TAS',
        sidebar: 'SidebarTASBrowse',
        feature: 'Browse',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'TAS', href: '/TAS', disabled: false },
          { text: 'Browse', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/TAS/Combine',
      name: 'TAS-Combine',
      component: TASCombine,
      meta: {
        title: 'TAS-Combine',
        group: 'TAS',
        sidebar: 'SidebarTASCombine',
        feature: 'Combine',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'TAS', href: '/TAS', disabled: false },
          { text: 'Combine', href: '/', disabled: true },
        ],
      },
    },
  ],
});
