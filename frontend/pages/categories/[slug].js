import Head from 'next/head' // for meta title, desc, urls, etc
import Link from 'next/link'
import { withRouter } from 'next/router'
import Layout from '../../components/Layout'
import React, { useEffect, useState } from 'react'
import { singleCategory } from '../../actions/category'
//import { API } from '../../config'
import renderHTML from 'react-render-html'
import moment from 'moment' //use for formatting the date
import Card from '../../components/blog/Card'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config' //for head

//server side rendered
const Category = ({category, blogs, router, query}) => {

    const head = () => (
        <Head>
            <title>Weeb Blogs | {APP_NAME}</title>
            <meta
                name="description"
                content="Random blogs from random weebs" />
            <link rel="canonical" href={`${DOMAIN}${query.slug}`} />
            <meta
                property="og:title"
                content={`Latest weeb blogs | ${APP_NAME}`}
            />
            <meta property="og:description" content="Random blogs from random weebs" />

            <meta property="og:type" content="website" />

            <meta property="og:url" content={`${DOMAIN}${router.asPath}`} />

            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/nakamagarage.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/nakamagarage.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />

        </Head>
    )

    return(
        <React.Fragment>
            <Layout>
                {head()}
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{category.name}</h1>
                                {blogs.map((blog, index) => (
                                    <div key={index}>                                       
                                        <Card  blog={blog} />
                                        <hr />
                                    </div>
                                ))}
                                
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Category.getInitialProps = ({query}) => {
    return singleCategory(query.slug).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {category: data.category, blogs: data.blogs, query};
        }
    });
};

export default withRouter(Category);