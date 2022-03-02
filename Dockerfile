FROM public.ecr.aws/ubuntu/ubuntu:latest
ARG FOO
RUN echo -n "FOO is: ($FOO)" > foo.txt
CMD cat foo.txt
