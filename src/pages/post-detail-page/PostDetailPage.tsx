import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

import PostTitle from '@/components/post/post-detail/PostTitle';
import PostTag from '@/components/post/post-detail/PostTag';
import PostInfo from '@/components/post/post-detail/PostInfo';
import SaveCourse from '@/components/post/post-detail/SaveCourse';
import PostMap from '@/components/post/post-detail/PostMap';
import PostContents from '@/components/post/post-detail/PostContents';
import PostLikeButton from '@/components/post/post-detail/PostLikeButton';
import PostCommentButton from '@/components/post/post-detail/PostCommentButton';
import PostButton from '@/components/post/post-detail/PostButton';
import PostInputComment from '@/components/post/post-detail/PostInputComment';
import PostComment from '@/components/post/post-detail/PostComment';

const PostDetailPage = () => {
  return (
    <PostDetailPageDesign showsVerticalScrollIndicator={false}>
      <PostTitle />
      <PostTag />
      <InfoSelectCourseBox>
        <PostInfo />
        <SaveCourse />
      </InfoSelectCourseBox>
      <PostMap />
      <PostContents />
      <Boxs>
        <ButtonsBox>
          <PostLikeButton />
          <PostCommentButton />
        </ButtonsBox>
        <ButtonsBox>
          <PostButton>수정</PostButton>
          <PostButton>삭제</PostButton>
        </ButtonsBox>
      </Boxs>
      <PostInputComment>
        <PostButton>입력</PostButton>
      </PostInputComment>
      <PostComment>댓글입니다</PostComment>
      <PostComment>댓글입니다</PostComment>
      <PostComment>댓글입니다</PostComment>
    </PostDetailPageDesign>
  );
};

export default PostDetailPage;

const PostDetailPageDesign = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 10px;
`;

const InfoSelectCourseBox = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Boxs = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonsBox = styled.View`
  flex-direction: row;
  height: 20px;
`;
