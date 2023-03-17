import courseApi from '~/services/api/course';
import axios from 'axios';
import store from 'store';
const Course = () => {
    courseApi.getAllCourse().then((res) => {
        console.log(res);
    });
    // const accessToken = store.get('access_token');
    // console.log(accessToken);
    // axios
    //     .get('http://localhost:3001', {
    //         headers: {
    //             'Target-URL': 'http://canvas.docker/api/v1/courses',
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //     })
    //     .then((response) => {
    //         // Handle response
    //         console.log(response.data);
    //     })
    //     .catch((err) => {
    //         // Handle errors
    //         console.error(err);
    //     });
    return <div>asdsad`</div>;
};

export default Course;
