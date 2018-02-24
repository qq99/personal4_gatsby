export const labImageFragment = graphql`
fragment LabImageFragment on ImageSharp {
  sizes(maxWidth: 808, quality: 90) {
    ...GatsbyImageSharpSizes_tracedSVG
  }
}
`;