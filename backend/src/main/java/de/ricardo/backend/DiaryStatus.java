package de.ricardo.backend;

public enum DiaryStatus {
    LESS_THAN_SIX_THOUSAND_STEPS(0),
    SIX_THOUSAND_STEPS(6000),
    EIGHT_THOUSAND_STEPS(8000),
    TEN_THOUSAND_STEPS(10000),
    MORE_THAN_TEN_THOUSAND_STEPS(10001);

    private final int steps;

    DiaryStatus(int steps) {
        this.steps = steps;
    }

    public int getSteps() {
        return steps;
    }
}