import { gql, request } from 'graphql-request'
const MASTER_URL="https://eu-west-2.cdn.hygraph.com/content/cm9pg8vt001ry08vyt2wdetor/master";

export const getCourseList = async () => {
  const query = gql`
        query CourseList {
            courses(where: {level: basic}) {
                id
                name
                level
                price
                tags
                time
                author
                banner {
                url
                }
                chapters {
                id
                }
            }
        }
    `

    const result = await request(MASTER_URL, query)
    return result;
}