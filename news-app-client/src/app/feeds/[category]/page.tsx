const getArticlesByCategory = async (category: string) => {
    try {
        const res = await fetch(`http://localhost:8080/api/articles/getArticlesByCategory/${category}`);
        const articles = await res.json();
        return articles["data"];
    } catch (err) {
        console.log(err);
        return err;
    }
}
export default function Feed() {
    return (
        <></>
    )
}