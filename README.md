# Barnsley Fern Fractals

The Barnsley fern is a well-known fractal that mimics the appearance of a natural fern. It is generated using an iterated function system (IFS), which applies a set of affine transformations to create a complex structure from simple rules. The fern's shape emerges through the repeated application of four specific transformation functions, each associated with a probability that determines how likely it is to be chosen during the iterations.

![image](https://github.com/user-attachments/assets/6a865111-a185-4f40-94ef-e89191891345)

## Affine Transformations / Functions and Corresponding Probabilities

| Transformation | Matrix                  | Translation | Probability |
| -------------- | ----------------------- | ----------- | ----------- |
| f₁             | [0 0; 0 0.16]           | [0; 0]      | 0.01        |
| f₂             | [0.85 0.04; -0.04 0.85] | [0; 1.6]    | 0.86        |
| f₃             | [0.2 -0.26; 0.23 0.22]  | [0; 1.6]    | 0.07        |
| f₄             | [-0.15 0.26; 0.28 0.24] | [0; 0.44]   | 0.06        |

## Demo

See the demonstration [here](https://barnsley-fern.vercel.app)
