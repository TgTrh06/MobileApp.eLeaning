import { gql, request } from 'graphql-request'
import { Course } from '../utils/types';
const MASTER_URL="https://eu-west-2.cdn.hygraph.com/content/cm9pg8vt001ry08vyt2wdetor/master";

// Define the response type for the GraphQL query
interface CourseListResponse {
    courses: Course[];
}

export const getCourseListLevel = async (level?: string)
: Promise<CourseListResponse> => {
  const query = gql`
        query CourseList($level: CourseLevel) {
            courses(where: { level: $level }) {
                id
                name
                level
                price
                tags
                time
                author    
                description {
                    markdown
                }                
                banner {
                    url
                }
                chapters {
                    title
                    id
                    content {
                        content {
                            markdown
                        }
                        output {
                            markdown
                        }
                    }
                }
            }
        }
    `

    return await request<CourseListResponse>(MASTER_URL, query, { level });
}

export const getCourseList = async () => {
  const query = gql`
        query CourseList {
            courses(where: {name: "Basic Python Course"}) {
                id
                name
                level
                price
                tags
                time
                author
                description {
                    markdown
                }        
                banner {
                    url
                }
                chapters {
                    title
                    id
                    content {
                        content {
                            markdown
                        }
                        output {
                            markdown
                        }
                    }
                }
            }
        }
    `

    return await request(MASTER_URL, query);
}