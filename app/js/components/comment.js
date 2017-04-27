import m from 'mithril';
import stream from 'mithril/stream';
import button from './button';
import textArea from './textArea';

export default function Comment({ params, api }) {
  const comment = stream(params);
  const editCommentText = stream(params.content);
  const isEditing = stream(false);
  const isEditLoading = stream(false);
  const isDeleteLoading = stream(false);
  const apiError = stream('');

  const switchToEditingView = () => {
    isEditing(true);
    m.redraw();
    console.log('Ssdfasf', isEditing());
  };

  const deleteComment = () => {
    isDeleteLoading(true);

    api.deleteComment({ commentId: comment().id })
    .then(res => {
      if (!res.success) throw res.errMsg;
      comment(null);
      m.redraw();
    })
    .catch(err => { apiError(err); isDeleteLoading(false); m.redraw(); })
  };

  const editComment = () => {
    isEditLoading(true);

    api.editComment({ commentId: comment().id, content: editCommentText() })
    .then(res => {
      if (!res.success) throw res.errMsg;
      reloadComment(comment().id);
      isEditing(false);
    })
    .catch(err => { apiError(err); isEditLoading(false); m.redraw(); });
  };

  const reloadComment = id => {
    api.comments('?id=' + id)
    .then(res => {
      if (!res.success) throw res.errMsg;
      comment(res.data);
      isEditLoading(false);
      m.redraw();
    })
    .catch(err => { apiError(err); isEditLoading(false); m.redraw(); });
  };

  const editView = () => m('.comment', [
    textArea('edit-comment', editCommentText),
    button('save-edit-comment', editComment, 'Save', isEditLoading())
  ]);

  const readView = () => m('.comment', [
    m('.comment-content', comment().content),
    m('.comment-meta', 'Posted by ' + comment().username + ' on ' + new Date(comment().datetime).toDateString()),
    m('.comment-btn-containers', [
      button('edit-comment', switchToEditingView, 'Edit'),
      button('delete-comment', deleteComment, 'Delete', isDeleteLoading())
    ])
  ]);

  const view = () => {
    console.log('Is Editing', isEditing());
    return comment()
      ? isEditing() ? editView() : readView()
      : [];
  }

  return { view };

}

