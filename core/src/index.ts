import Auth from './auth';
import Email from './email';
import Common from './common';
import Post from './post';

export default (() => {
    const post = new Post();
    const common = new Common();
    const email = new Email();
    const auth = new Auth();
    return {
        post,
        common,
        email,
        auth,
    };
})();
