import { gql, request } from 'graphql-request'
import { Course, CreateUserEnrolledResponse, EnrollCourseVariables, PublishUserEnrolledResponse, User, UserDetailVariables, UserEnrolledCourse, UserEnrolledCourseList } from '../utils/types';

// const MASTER_URL = process.env.HYGRAPH_API_URL;
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
                        id
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
                        id
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

export const enrollCourse = async (courseId: string, userEmail: string) 
: Promise<PublishUserEnrolledResponse | undefined> => {
    try {
        const createMutationQuery = gql`
            mutation CreateUserEnrolled($courseIdString: String!, $courseIdID: ID!, $userEmail: String!) {
                createUserEnrolledCourse(
                    data: { courseId: $courseIdString, userEmail: $userEmail, course: {connect: {id: $courseIdID}}}
                ) {
                    id
                }
            }
        `;

        const variables: EnrollCourseVariables = { // Defined in utils/types.ts
            courseIdString: courseId, // Corresponds to $courseIdString in mutation
            courseIdID: courseId,     // Corresponds to $courseIdID in mutation
            userEmail                 // Corresponds to $userEmail in mutation
        };

        const createRes = await request<CreateUserEnrolledResponse>(MASTER_URL, createMutationQuery, variables);
        
        console.log('Phản hồi từ createUserEnrolledCourse:', JSON.stringify(createRes, null, 2));

        const createdId = createRes?.createUserEnrolledCourse?.id;

        if (!createdId) {
            if ((createdId as any)?.errors) {
                console.error('Error GraphQL while creating UserEnrolledCourse:', JSON.stringify((createRes as any).errors, null, 2));
            }
            throw new Error('Can not get createId.');
        }

        const publishMutationQuery = gql`
            mutation PublishUserEnrolled($id: ID!) {
                publishUserEnrolledCourse(where: { id: $id }) {
                    id
                }
            }
        `;

        const publishRes = await request<PublishUserEnrolledResponse>(MASTER_URL, publishMutationQuery, { id: createdId });
        
        console.log('Reponse from publishUserEnrolledCourse:', JSON.stringify(publishRes, null, 2));
    
        // Check before Returning
        if (!publishRes?.publishUserEnrolledCourse?.id) {
            if ((publishRes as any)?.errors) {
                console.error('Lỗi GraphQL khi publish UserEnrolledCourse:', JSON.stringify((publishRes as any).errors, null, 2));
            }
            throw new Error('Không thể publish UserEnrolledCourse hoặc không nhận được ID sau khi publish.');
        }

        return publishRes;
    } catch (error) {
        // Log error more detail
        if (error instanceof Error) {
            console.error('Lỗi trong quá trình enrollCourse:', error.message);
            console.error('Stack trace:', error.stack);
        } else {
            console.error('Lỗi không xác định trong enrollCourse:', error);
        }
        // Throw error for function to handle
        throw error;
    }
}

export const getUserEnrollCourse = async (courseId: string, userEmail: string) 
: Promise<UserEnrolledCourseList> => {    
    const query = gql`
        query GetUserEnrollCourse ($courseId: String!, $userEmail: String!) {
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

export const MarkChapterComplete = async(id: string, chapterId: string) 
: Promise<UserEnrolledCourse> => { 
    const mutationQuery = gql`
        mutation markChapterCompleted($id: ID!, $chapterId: String!) {
            updateUserEnrolledCourse(
                where: {id: $id}
                data: {completedChapter: {create: {data: {chapterId: $chapterId}}}}
            ) {
                id
                courseId
                completedChapter {
                    chapterId   
                }
            }
            publishUserEnrolledCourse(where: { id: $id }, to: PUBLISHED) {
                id
            }
        }
    `

    return await request<UserEnrolledCourse>(MASTER_URL, mutationQuery, { id, chapterId })
        .catch((error) => {
            console.error("GraphQL Error:", error.response || error);
            throw error;
        });
}

export const upsertUserDetail = async (
  email: string,
  userName: string,
  profileImage: string,
  point = 0
): Promise<User | undefined> => {
  try {
    const upsertMutation = gql`
      mutation UpsertUserDetail(
        $email: String!
        $point: Int!
        $userName: String!
        $profileImage: String!
      ) {
        upsertUserDetail(
          where: { email: $email }
          upsert: {
            create: {
              email: $email
              point: $point
              userName: $userName
              profileImage: $profileImage
            }
            update: {
              point: $point
              userName: $userName
              profileImage: $profileImage
            }
          }
        ) {
          id
        }
      }
    `;

    const upsertVariables = {
      email,
      point,
      userName,
      profileImage,
    };

    const upsertRes = await request<User>(
      MASTER_URL,
      upsertMutation,
      upsertVariables
    );

    console.log('Phản hồi từ upsertUserDetail:', JSON.stringify(upsertRes, null, 2));

    const createdId = upsertRes?.detail?.id;

    if (!createdId) {
      throw new Error('Không thể lấy ID từ kết quả upsertUserDetail.');
    }

    const publishMutation = gql`
      mutation PublishUserDetail($id: ID!) {
        publishUserDetail(where: { id: $id }) {
          id
        }
      }
    `;

    const publishRes = await request<User>(MASTER_URL, publishMutation, { id: createdId });

    console.log('Phản hồi từ publishUserDetail:', JSON.stringify(publishRes, null, 2));

    if (!publishRes?.detail?.id) {
      throw new Error('Không thể publish user detail hoặc ID bị thiếu.');
    }

    return publishRes;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Lỗi trong quá trình upsertUserDetail:', error.message);
      console.error('Stack trace:', error.stack);
    } else {
      console.error('Lỗi không xác định trong upsertUserDetail:', error);
    }
    throw error;
  }
};

export const getUserDetail = async (email: string)
: Promise<User> => {
  const mutation = gql`
    query getUserDetails($email: String!) {
        userDetail(where: {email: $email}) {
            id,
            email,
            point,
            userName,
            profileImage,
        }
    }
  `;

  try {
    return await request<User>(MASTER_URL, mutation, { email });
  } catch (error) {
    console.error('GraphQL error in upsertUserDetail:', error);
    throw error;
  }
};