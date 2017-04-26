import m from 'mithril';
import Comment from './components/comment';
import Nav from './components/nav';

const sampleBlog = {
  id: 1,
  username: 'aashah7',
  title: 'Some blog here',
  content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
  datetime: new Date().toISOString()
};

const sampleComments = [{
  id: 1,
  username: 'aashah7',
  content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
  datetime: new Date().toISOString()
}, {
  id: 2,
  username: 'aashah7',
  content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
  datetime: new Date().toISOString()
}]

export default function Blog({ api }) {

  const nav = Nav({ api });

  const blog = () => m('.blog-full', [
    m('.blog-title', sampleBlog.title),
    m('.blog-meta', 'Posted by ' + sampleBlog.username + ' on ' + new Date(sampleBlog.datetime).toDateString()),
    m('.blog-content', sampleBlog.content)
  ]);

  const comments = () => m('.blog-comment-list', sampleComments.map(c => m(Comment(c))));

  const view = () => m('.blog',
    m(nav),
    m('.page-view', [
      blog(),
      m('.comment-title', 'Comments'),
      comments()
    ])
  );

  return { view };

}
