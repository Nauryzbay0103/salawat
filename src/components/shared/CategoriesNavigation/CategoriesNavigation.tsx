import { categories } from '@/data/categories'
import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router'
import styles from './CategoriesNavigation.module.scss'

const CategoriesNavigation = () => {
    const { type } = useParams()
    const categoriesRefs = useRef<Record<string, HTMLLIElement | null>>({})
    const setCurrentCategory = (categoryType: string) => (el: HTMLLIElement | null) => {
        if (el) categoriesRefs.current[categoryType] = el
    }

    useEffect(() => {
        const activeCategory = categoriesRefs.current[type || '']

        if (activeCategory) {
            activeCategory.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
            })
        }
    }, [type])

    useEffect(() => window.scrollTo(0, 0), [])

    return (
        <ul className={styles.categories}>
            {categories.map((category) => (
                <li
                    className={styles.category}
                    ref={setCurrentCategory(category.uuid)}
                    key={category.id}
                    data-category={category.uuid}
                >
                    <Link
                        to={`/`}
                        className={`flex items-center justify-center ${styles.category__link} ${
                            '9a7aab79-02d7-497c-bc15-c3b9e99753bc' === category.uuid ? styles.active : ''
                        }`}
                    >
                        {category.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default CategoriesNavigation
