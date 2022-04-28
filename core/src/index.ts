import Common from './common';
import Post from './post';

export default (() => {
    const post = new Post();
    const common = new Common();
    return {
        post,
        common,
    };
})();
