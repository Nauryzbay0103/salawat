import CategoryContent from '@/components/views/Category/CategoryContent/CategoryContent'
import HomeCarousel from '@/components/views/Home/HomeCarousel/HomeCarousel'
import HomeHeader from '@/components/views/Home/HomeHeader/HomeHeader'
import { useProductStore } from '@/stores/useProductStore'
import { useEffect } from 'react'

const Home = () => {
    const { fetchProductsByCategoryId } = useProductStore()

    useEffect(() => {
        fetchProductsByCategoryId('9a7aab79-02d7-497c-bc15-c3b9e99753bc')
    }, [])

    return (
        <section>
            <HomeHeader />
            <div>
                <HomeCarousel />
            </div>
            <CategoryContent />
        </section>
    )
}

export default Home
