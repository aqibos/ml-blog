import m from 'mithril';
import stream from 'mithril/stream';
import button from './button';
import textArea from './textArea';
import { getItem } from '../util/session_storage';
import { dateWithTime } from '../util/format';

export default function Comment({ params, api, editFn, deleteFn }) {
  const commentId = params.id;
  const comment = stream(params);
  const editCommentText = stream(params.content);
  const isEditing = stream(false);
  const isEditLoading = stream(false);
  const isDeleteLoading = stream(false);
  const apiError = stream('');
  const { username } = getItem('user');

  const switchToEditingView = () => { isEditing(true); m.redraw(); };

  const editView = () => m('.comment', [
    textArea('edit-comment', editCommentText),
    button(
      'save-edit-comment',
      () => editFn(commentId, editCommentText(), isEditLoading),
      'Save',
      isEditLoading()
    )
  ]);

  const commentActions = () => {
    const isOwner = comment().username === username;
    if (!isOwner) return [];
    return m('.comment-btn-containers', [
      button('edit-comment', switchToEditingView, 'Edit'),
      button(
        'delete-comment', () => deleteFn(commentId, isDeleteLoading), 'Delete', isDeleteLoading()
      )
    ])
  };

  const readView = () => m('.comment', [
    m('.comment-content', comment().content),
    m('.comment-meta', 'Posted by ' + comment().username + ' on ' + dateWithTime(comment().datetime)),
    commentActions()
  ]);

  const view = () => {
    console.log('Is Editing', username);
    return comment()
      ? isEditing() ? editView() : readView()
      : [];
  }

  return { view };

}

