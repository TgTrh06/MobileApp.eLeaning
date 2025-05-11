import { gql, request } from 'graphql-request'
import { Course, EnrollCourseVariables, UserEnrolledCourseList } from '../utils/types';
const MASTER_URL="https://eu-west-2.cdn.hygraph.com/content/cm9pg8vt001ry08vyt2wdetor/master";

// Define the response list for the GraphQL query
interface CourseListResponse {
    courses: Course[]; // Defined in utils/types.ts
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
                        heading
                        content {
                            markdown
                            html
                        }
                        output {
                            markdown
                            html
                        }
                    }
                }
            }
        }
    `

    return await request<CourseListResponse>(MASTER_URL, query, { level });
}

export const getAllCourses = async () => {
  const query = gql`
        query CourseList {
            courses() {
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
                        heading
                        content {
                            markdown
                            html
                        }
                        output {
                            markdown
                            html
                        }
                    }
                }
            }
        }
    `

    return await request<CourseListResponse>(MASTER_URL, query);
}

export const enrollCourse = async (courseId: string, userEmail: string) => {
    const mutationQuery = gql`
        mutation MyMutation($courseIdString: String, $courseIdID: ID, $userEmail: String) {
            createUserEnrolledCourse(
                data: { courseId: $courseIdString, userEmail: $userEmail, course: {connect: {id: $courseIdID}}}
            ) {
                id
            }
            publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    `
    const variables: EnrollCourseVariables = { // Defined in utils/types.ts
        courseIdString: courseId, // Corresponds to $courseIdString in mutation
        courseIdID: courseId,     // Corresponds to $courseIdID in mutation
        userEmail                 // Corresponds to $userEmail in mutation
    };

    return await request(MASTER_URL, mutationQuery, variables)  
        .catch((error) => {
            console.error("GraphQL Error:", error.response || error);
            throw error;
        });
}

export const getUserEnrollCourse = async (courseId: string, userEmail: string) 
: Promise<UserEnrolledCourseList> => {    
    const query = gql`
        query GetUserEnrollCourse ($courseId: String, $userEmail: String) {
            userEnrolledCourses(where: {courseId: $courseId, userEmail: $userEmail}) {
                id
                courseId
                completedChapter {
                    chapterId
                }
            }
        }
    `

    return await request<UserEnrolledCourseList>(MASTER_URL, query, { courseId, userEmail })
}